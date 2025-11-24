export default function VideoPromo() {
  return (
    <div className="flex justify-center items-center p-10">
      <iframe
        src="https://player.vimeo.com/video/1123300373?autoplay=1&muted=1&loop=1&background=0&title=0&byline=0&portrait=0&playsinline=1"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="rounded-xl shadow-lg w-[450px] h-[800px]"
      ></iframe>
    </div>
  );
}
