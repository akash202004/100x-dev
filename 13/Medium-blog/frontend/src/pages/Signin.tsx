import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block">
          <Quote />
        </div>
        <div className="flex justify-center">
          <Auth type="signin" />
        </div>
      </div>
    </div>
  );
};
