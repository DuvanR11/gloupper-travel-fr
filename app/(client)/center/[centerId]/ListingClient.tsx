'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import { useLoginModal } from "@/hooks/modal/auth";
import { SafeUser } from "@/app/types";

import Container from "@/components/layouts/Container";
import { categories } from "@/components/ui/navbar/Categories";
import ListingHead from "@/components/center/ListingHead";
import ListingInfo from "@/components/center/ListingInfo";
import ListingReservation from "@/components/center/ListingReservation";
import ListingSer from "@/components/center/ListingSer";
import Map from "@/components/geolocalization/Map";
import Heading from "@/components/ui/headers/Heading";
import CenterReview from "@/components/center/CenterReview";
import { ReviewModal } from "@/components/center/modals";
import { useReviewModal } from "@/hooks/modal/center";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: any[] // SafeReservation[];
  listing: any & { //SafeListing
    user: SafeUser;
  };
  reviews?: any | null;
  currentUser?: SafeUser | null;
}

const Dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados', 'Domingo']

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
  reviews
}) => {
  const loginModal = useLoginModal();
  const reviewModal = useReviewModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/reservations', {
        totalPrice: 10,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        centerId: listing?.id
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    dateRange, 
    listing?.id,
    router,
    currentUser,
    loginModal
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
    }
  }, [dateRange]);

  const onOpenModalReview = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    return reviewModal.onOpen()
  },[
    dateRange, 
    listing?.id,
    router,
    currentUser,
    loginModal
  ])


  return ( 
    <Container>
      <div 
        className="
          max-w-screen  
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.city}
            images={listing.images}
            id={listing.id}
            currentUser={currentUser}
          />
          {/* Section Information */}
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              services={listing.services}
              category={category}
              description={listing.description}
              locationValue={listing.city}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={22}
                totalPrice={2}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
          {/* Section Services */}
          <ListingSer 
            currentUser={ currentUser } 
            center={ listing }
          />
          {/* Section Maps */}
          <div>
            <Heading
              title='A dónde irás'
              subtitle={`Gigante, Huila, Colombia`}
            />
            <br />
            <Map center={[2.3677, -75.5695]}/>
            <br /> <br /><hr />
          </div>
          {/* Section Reseñas */}
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-3
              md:gap-5
              mt-6
            ">
            <div className="col-span-1">
              <div  className="mb-4 rounded p-4 bg-white border-[1px] border-neutral-200">
                <div className="flex items-center gap-2">
                  <img className="h-10 w-10 flex-none rounded-full bg-gray-50" src={listing.imageSrc} alt="" />
                  <p className="text-lg font-bold">{listing.title}</p>
                </div>
                <p className="underline mt-2">{listing.category}</p>
                <p>Reseñas de usuario ( { listing.reviews.length } )</p>
                <p>Calificación: 4.5</p>
              </div>
              <div className="rounded p-4 bg-white border-[1px] border-neutral-200">
                <p className="text-lg font-bold mb-2">Horarios de atención</p>
                <ul>
                  {Dias.map((dia) => (
                    <li key={dia} className="flex justify-between mb-1">
                      <span>{dia}</span>
                      <span>11:00 - 22:00</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-span-2">
              <Heading
                title='Reseñas'
                subtitle={'Esto piensan otros usuarios'}
              />
              <button onClick={() => onOpenModalReview() }>Crear Reseña</button>
              <br />
              <CenterReview reviews={ reviews }/>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal center={ listing }/>
    </Container>
   );
}
 
export default ListingClient;
