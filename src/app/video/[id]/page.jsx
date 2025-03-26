// import { uri } from "../../page.jsx";
export default async function VideoPreview({ params }) {
  const uri = "https://stream.xxxvideoshub.in"

    const { id } = await params; // Ensure params is awaited properly
    if (!params) return <div>Loading...</div>; // Handle case where params is not ready
    const res = await fetch(`${uri}/api/stream/video?id=${id}`, { cache: "no-store" });
    let video = await res.json().then((data) => data.video.split("/"));
    video = `${uri}/files/${video[video.length - 1]}`;

    return (
        <main>
            <h1>{video.title}</h1>
            <p>Duration: {video.duration}</p>
            <video controls width="640">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="footer">
                <h3>tags : <span>{video.tag}</span></h3>
            </div>
        </main>
    );
}


