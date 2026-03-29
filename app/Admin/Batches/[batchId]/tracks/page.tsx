export default function tracks( {
  params,
}: {
  params: { batchId: string };

}) 
{
    return (
        <div>
            {params.batchId}
        </div>
    )
}