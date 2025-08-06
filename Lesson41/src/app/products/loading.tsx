export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <style>
        {`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer-bg {
          background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
        `}
      </style>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full flex flex-col lg:flex-row">
        {/* Product Image Placeholder Section */}
        <div className="lg:w-1/2 p-4 sm:p-6 flex items-center justify-center bg-gray-50">
          <div className="w-full h-64 sm:h-80 lg:h-full rounded-lg shimmer-bg"></div>
        </div>

        {/* Product Details Placeholder Section */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Product Name Placeholder */}
            <div className="h-8 w-3/4 rounded-md shimmer-bg mb-4"></div>
            {/* Price Placeholder */}
            <div className="h-6 w-1/4 rounded-md shimmer-bg mb-6"></div>
            {/* Description Placeholders */}
            <div className="h-4 w-full rounded-md shimmer-bg mb-2"></div>
            <div className="h-4 w-11/12 rounded-md shimmer-bg mb-2"></div>
            <div className="h-4 w-5/6 rounded-md shimmer-bg mb-6"></div>

            {/* Rating and Reviews Placeholder */}
            <div className="flex items-center mb-6">
              <div className="h-4 w-1/3 rounded-md shimmer-bg"></div>
            </div>

            {/* Availability Placeholder */}
            <div className="mb-6">
              <div className="h-4 w-1/4 rounded-md shimmer-bg"></div>
            </div>
          </div>

          {/* Action Buttons Placeholders */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex-1 h-12 rounded-lg shimmer-bg"></div>
            <div className="flex-1 h-12 rounded-lg shimmer-bg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
