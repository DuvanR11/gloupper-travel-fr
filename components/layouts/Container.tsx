interface ContainerProps {
  children: React.ReactNode
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return ( 
    <div
      className="
        max-w-[2700px]
        mx-auto
        xl:px-10 
        md:px-10
        sm:px-2
        px-4
      "
    >
      {children}
    </div>
   );
}
 
