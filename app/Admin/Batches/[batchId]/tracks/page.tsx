export default async function tracks({
  params,
}: {
  params: Promise<{ batchId: string }>;
}) {
  const { batchId } = await params;
  return (
    <div>
      {batchId}
    </div>
  );
}