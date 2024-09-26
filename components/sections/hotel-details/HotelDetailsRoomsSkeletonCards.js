'use client'
import ContentLoader from 'react-content-loader'
export default function HotelDetailsRoomsSkeletonCards() {
  return (
    <div
      id="hotel-details-rooms-skeleton-cards"
      className="mt-5 grid grid-flow-row px-0 sm:px-5 2xl:px-[60px]  gap-4 text-[#002248] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    >
      <div
        role="status"
        className="max-w-sm border border-gray-200 rounded-lg shadow-lg animate-pulse mt-8"
      >
        <ContentLoader
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    <rect x="43" y="239" rx="4" ry="4" width="271" height="15" />
    <rect x="44" y="265" rx="3" ry="3" width="119" height="9" />
    <rect x="44" y="280" rx="3" ry="3" width="119" height="9" />
    <rect x="44" y="295" rx="3" ry="3" width="119" height="9" />
    <rect x="42" y="10" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
      </div>
      <div
        role="status"
        className="max-w-sm border border-gray-200 rounded-lg shadow-lg animate-pulse mt-8"
      >
          <ContentLoader
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    <rect x="43" y="239" rx="4" ry="4" width="271" height="15" />
    <rect x="44" y="265" rx="3" ry="3" width="119" height="9" />
    <rect x="44" y="280" rx="3" ry="3" width="119" height="9" />
    <rect x="44" y="295" rx="3" ry="3" width="119" height="9" />
    <rect x="42" y="10" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
      </div>
      <div
        role="status"
        className="max-w-sm border border-gray-200 rounded-lg shadow-lg animate-pulse mt-8"
      >
           <ContentLoader
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    <rect x="43" y="239" rx="4" ry="4" width="271" height="15" />
    <rect x="44" y="265" rx="3" ry="3" width="119" height="9" />
    <rect x="44" y="280" rx="3" ry="3" width="119" height="9" />
    <rect x="44" y="295" rx="3" ry="3" width="119" height="9" />
    <rect x="42" y="10" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
      </div>
    </div>
  );
}
