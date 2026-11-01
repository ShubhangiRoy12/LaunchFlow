import { Composition } from "remotion";
import { LaunchFlowVideo } from "./LaunchFlowVideo";

const defaultProps = {
  productName: "LaunchFlow AI",
  tagline: "AI Creative Director for Product Launches",
  audience: "Founders, creators and product teams",
  features: ["Website Analysis", "Storyboard Generation", "Motion Design", "Video Export"],
  storyboard: ["Hook", "Problem", "Solution", "Features", "CTA"],
  screenshot: undefined,
};

export const Root = () => {
  return (
    <Composition
      id="LaunchFlowVideo"
      component={LaunchFlowVideo}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
    />
  );
};
