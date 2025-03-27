import ClipLoader from "./ClipLoader";

const CenteredLoader = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <ClipLoader size={50} color={"#123abc"} loading={true} />
  </div>
);
export default CenteredLoader;
