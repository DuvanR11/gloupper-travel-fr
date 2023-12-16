'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold dark:text-white">
        {title}
      </div>
      <div className="font-light text-neutral-500 dark:text-gray-400 mt-2">
        {subtitle}
      </div>
    </div>
   );
}
 