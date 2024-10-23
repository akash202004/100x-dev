import { Admin as UIAdmin } from "@repo/ui/admin";
import { InputBox } from "@repo/ui/input-box";

export default function Admin() {
  return (
    <div>
      <UIAdmin />
      <InputBox children="Akash"/>
    </div>
  );
}
