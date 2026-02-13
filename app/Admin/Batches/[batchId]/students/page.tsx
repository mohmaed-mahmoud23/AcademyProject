export default function StudentsPage({
  params,
}: {
  params: { batchId: string };
}) {
  return (
    <div>
      <h1>Students in Batch: {params.batchId}</h1>
    </div>
  );
}
