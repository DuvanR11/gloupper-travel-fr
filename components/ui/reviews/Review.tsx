
interface ReviewProps {
  reviews: any[]
}
  
export const Review: React.FC<ReviewProps> = ({
  reviews
}) => {

  return ( 
    <div className="col-span-12 mb-4 flex flex-col gap-8">
        <ul role="list" className="divide-y divide-gray-100">
        {reviews.map((review) => (
            <li key={review.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={review.user.image} alt="" />
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{review.user.name}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            { review.description }
                        </p>
                        <p className="mt-1 text-xs text-right leading-5 text-gray-500">
                            {new Date(review.createdAt).toLocaleString('es-ES')}
                        </p>
                    </div>
                </div>
            </li>
        ))}
        </ul>
    </div>
   );
}
 