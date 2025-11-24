export default function VideoPromo() {
  return (
    <div className="flex justify-center items-center p-10">
      <video
        src="/promo.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls
        className="rounded-xl shadow-lg w-[350px] h-[500px] object-cover"
      />
    </div>
  );
}