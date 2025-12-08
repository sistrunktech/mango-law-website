interface AuthorBioProps {
  name: string;
  title?: string;
  credentials?: string;
  bio: string;
  imageUrl?: string;
}

export default function AuthorBio({
  name,
  title = 'Attorney at Law',
  credentials,
  bio,
  imageUrl = '/images/headshots/nick-mango-01.jpg',
}: AuthorBioProps) {
  return (
    <div className="my-12 rounded-xl border border-brand-black/10 bg-gray-50 p-6">
      <h3 className="mb-4 text-lg font-bold text-brand-black">About the Author</h3>
      <div>
        <h4 className="text-xl font-bold text-brand-black">{name}</h4>
        <p className="mt-1 text-sm font-medium text-brand-mango">
          {title}
          {credentials && ` | ${credentials}`}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-brand-black/70">{bio}</p>
      </div>
    </div>
  );
}
