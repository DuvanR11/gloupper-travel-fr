
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Carousel = ({ data }: any) => {

  const router = useRouter();

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {
            data.map((slide: any, index: number) => (
                <SwiperSlide key={index}>
                    <div 
                    onClick={() => { router.push(`/center/${slide.id}`) }} 
                    className="h-60 col-span-1 cursor-pointer group"
                    >
                        <div className="flex flex-col gap-2 h-full w-full">
                            <div 
                            className="
                                aspect-[4/3]
                                w-full 
                                relative 
                                overflow-hidden 
                                rounded-xl
                            "
                            >
                            <Image
                                fill
                                className="
                                object-cover 
                                h-full
                                w-full 
                                group-hover:scale-110 
                                transition
                                "
                                src={slide.imageSrc}
                                alt="Listing"
                            />
                            </div>
                            <div className="font-semibold text-lg">
                                {slide.title}
                            </div>
                            <div>
                                {slide.city}, Huila
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}
