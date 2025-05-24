import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={
              image
                ? `/images/properties/${image}`
                : `/images/properties/a1.jpg`
            }
            alt=""
            className="object-cover h-[400px] w-full"
            width={1000}
            height={400}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
