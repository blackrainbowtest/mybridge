export default function VideoPromo() {
  return (
    <div className="flex justify-center items-center p-10">
      <video
        src="/promo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="rounded-xl shadow-lg w-[500px] h-auto"
      />
    </div>
  );
}