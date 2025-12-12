import { useState, useEffect, useRef } from 'react';
import { X, Send, Phone } from 'lucide-react';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import { DIRECT_PHONE_DISPLAY, OFFICE_PHONE_DISPLAY } from '../../lib/contactInfo';

interface ConversationStep {
  id: string;
  botMessage: string | React.ReactNode;
  userResponse?: string;
  timestamp?: Date;
}

interface ConversationWindowProps {
  onClose: () => void;
  bottomOffsetClass?: string;
}

export default function ConversationWindow({ onClose, bottomOffsetClass = 'bottom-6' }: ConversationWindowProps) {
  const [currentStep, setCurrentStep] = useState<'name' | 'phone' | 'message' | 'confirmation' | 'followup'>('name');
  const [isTyping, setIsTyping] = useState(true);
  const [conversation, setConversation] = useState<ConversationStep[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [showFollowup, setShowFollowup] = useState(false);

  const conversationRef = useRef<HTMLDivElement>(null);
  const followupTimerRef = useRef<number>();
  const inactivityTimerRef = useRef<number>();

  // Load saved conversation from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mango-chat-session');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const lastActivity = new Date(data.lastActivity);
        const now = new Date();
        const minutesSinceActivity = (now.getTime() - lastActivity.getTime()) / 1000 / 60;

        // Session timeout after 30 minutes
        if (minutesSinceActivity < 30) {
          setConversation(data.conversation || []);
          setCurrentStep(data.currentStep || 'name');
          setName(data.name || '');
          setPhone(data.phone || '');
          setMessage(data.message || '');
        } else {
          localStorage.removeItem('mango-chat-session');
        }
      } catch (error) {
        console.error('Failed to restore chat session:', error);
        localStorage.removeItem('mango-chat-session');
      }
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    if (conversation.length > 0 || name || phone || message) {
      const sessionData = {
        conversation,
        currentStep,
        name,
        phone,
        message,
        lastActivity: new Date().toISOString(),
      };
      localStorage.setItem('mango-chat-session', JSON.stringify(sessionData));
    }
  }, [conversation, currentStep, name, phone, message]);

  // Reset inactivity timer
  useEffect(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = window.setTimeout(() => {
      localStorage.removeItem('mango-chat-session');
    }, 30 * 60 * 1000); // 30 minutes

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [conversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation, isTyping]);

  // Initial bot message
  useEffect(() => {
    if (conversation.length === 0) {
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage("Hi there — I can help you get started. What's your name?");
      }, 800);
    } else {
      setIsTyping(false);
    }
  }, []);

  const addBotMessage = (msg: string | React.ReactNode) => {
    setConversation((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        botMessage: msg,
        timestamp: new Date(),
      },
    ]);
  };

  const addUserMessage = (msg: string) => {
    setConversation((prev) => {
      const newConv = [...prev];
      if (newConv.length > 0) {
        newConv[newConv.length - 1].userResponse = msg;
      }
      return newConv;
    });
  };

  const handleNameSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError('Please enter your name');
      return;
    }
    if (trimmedName.length < 2) {
      setNameError('Name must be at least 2 characters');
      return;
    }

    setNameError('');
    addUserMessage(trimmedName);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(`Thanks, ${trimmedName}. What's the best phone number to reach you quickly?`);
      setCurrentStep('phone');
    }, 600);
  };

  const handlePhoneSubmit = () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }
    if (cleaned.length > 11) {
      setPhoneError('Phone number is too long');
      return;
    }

    setPhoneError('');
    const formatted = cleaned.length === 11
      ? `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
      : `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;

    addUserMessage(formatted);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addBotMessage("Got it. What's going on today? How can we help?");
      setCurrentStep('message');
    }, 600);
  };

  const handleMessageSubmit = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setMessageError('Please tell us how we can help');
      return;
    }
    if (trimmedMessage.length < 10) {
      setMessageError('Please provide more details (at least 10 characters)');
      return;
    }

    setMessageError('');
    addUserMessage(trimmedMessage);
    setIsTyping(true);
    setIsSubmitting(true);

    // Build conversation context
    const conversationContext = conversation
      .map((step) => `Bot: ${typeof step.botMessage === 'string' ? step.botMessage : ''}\nUser: ${step.userResponse || ''}`)
      .join('\n\n');

    // Submit to backend
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-intake`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D/g, ''),
          email: null,
          initial_message: trimmedMessage,
          conversation_context: conversationContext,
          source: 'chat_widget',
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`);
      }

      setIsTyping(false);
      setIsSubmitting(false);
      const confirmationMessage = (
        <div>
          <p className="mb-3">Thank you — sending this to the attorney now.</p>
          <div className="space-y-2 text-xs">
            <p className="font-semibold">Need immediate help?</p>
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>{OFFICE_PHONE_DISPLAY} — Office</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>{DIRECT_PHONE_DISPLAY} — Direct (Nick)</span>
            </div>
          </div>
        </div>
      );

      addBotMessage(confirmationMessage);
      setCurrentStep('confirmation');

      // Show follow-up message after 20-30 seconds
      const delay = 20000 + Math.random() * 10000; // 20-30 seconds
      followupTimerRef.current = window.setTimeout(() => {
        setShowFollowup(true);
        addBotMessage("If this is urgent, please call or text us directly at the numbers above.");
        setCurrentStep('followup');
      }, delay);

      // Clear session after successful submission
      setTimeout(() => {
        localStorage.removeItem('mango-chat-session');
      }, 2000);

    } catch (error) {
      console.error('Chat submission error:', error);
      setIsTyping(false);
      setIsSubmitting(false);
      setSubmissionError(`We had trouble sending your message. Please call us directly at ${OFFICE_PHONE_DISPLAY}.`);

      const errorMessage = (
        <div>
          <p className="mb-3">We had trouble sending your message. Please try again or call us directly:</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>{OFFICE_PHONE_DISPLAY} — Office</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>{DIRECT_PHONE_DISPLAY} — Direct (Nick)</span>
            </div>
          </div>
        </div>
      );

      addBotMessage(errorMessage);
      setCurrentStep('confirmation');
    }
  };

  useEffect(() => {
    return () => {
      if (followupTimerRef.current) {
        clearTimeout(followupTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={[
        'fixed inset-x-3 top-4 z-50 flex max-w-full flex-col rounded-2xl border border-brand-black/10 bg-white shadow-2xl',
        bottomOffsetClass,
        'lg:left-auto lg:right-6 lg:top-auto lg:bottom-6 lg:h-[600px] lg:w-[400px]',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-black/10 bg-gradient-to-r from-brand-mango to-brand-gold p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-brand-black/10 p-2">
            <img
              src="/images/brand/mango-icon-fullcolor.svg"
              alt="Mango Law"
              className="h-full w-full"
            />
          </div>
          <div>
            <h3 className="font-bold text-brand-black">Mango Law</h3>
            <p className="text-xs text-brand-black/70">Criminal Defense Attorney</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-brand-black transition-colors hover:bg-brand-black/10"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Conversation */}
      <div ref={conversationRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((step) => (
          <div key={step.id} className="space-y-3">
            <ChatBubble message={step.botMessage} sender="bot" timestamp={step.timestamp} />
            {step.userResponse && (
              <ChatBubble message={step.userResponse} sender="user" />
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input Area */}
      {currentStep !== 'confirmation' && currentStep !== 'followup' && (
        <div className="border-t border-brand-black/10 bg-brand-black/5 p-4">
          {currentStep === 'name' && (
            <div className="space-y-3">
              <TextInput
                value={name}
                onChange={setName}
                onSubmit={handleNameSubmit}
                placeholder="Enter your name"
                error={nameError}
              />
              <button
                onClick={handleNameSubmit}
                disabled={!name.trim() || isTyping}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <Send size={14} />
              </button>
            </div>
          )}

          {currentStep === 'phone' && (
            <div className="space-y-3">
              <PhoneInput
                value={phone}
                onChange={setPhone}
                onSubmit={handlePhoneSubmit}
                error={phoneError}
              />
              <button
                onClick={handlePhoneSubmit}
                disabled={phone.replace(/\D/g, '').length < 10 || isTyping}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <Send size={14} />
              </button>
            </div>
          )}

          {currentStep === 'message' && (
            <div className="space-y-3">
              <TextInput
                value={message}
                onChange={setMessage}
                onSubmit={handleMessageSubmit}
                placeholder="Describe your situation..."
                multiline
                error={messageError}
              />
              <button
                onClick={handleMessageSubmit}
                disabled={!message.trim() || isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-black border-t-transparent" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
              {submissionError && (
                <p className="text-xs text-red-600">{submissionError}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="border-t border-brand-black/10 bg-white p-3">
        <p className="text-[10px] text-brand-black/50 text-center leading-tight">
          This chat is not monitored 24/7. No attorney-client relationship is formed until formally engaged. For urgent matters, please call directly.
        </p>
      </div>
    </div>
  );
}
