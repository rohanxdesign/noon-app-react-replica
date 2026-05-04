export type CollectionTitleProps = {
  title: string;
  itemCount: number;
};

export default function CollectionTitle({
  title,
  itemCount,
}: CollectionTitleProps) {
  return (
    <div className="flex w-full flex-col items-start gap-1 text-center">
      <p className="w-full font-primary text-h32 font-bold text-text-primary">
        {title}
      </p>
      <p className="w-full font-primary text-b14 font-medium text-text-muted">
        {itemCount} Items
      </p>
    </div>
  );
}
