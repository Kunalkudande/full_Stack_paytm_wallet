import toast, { Toaster } from "react-hot-toast";
import { Appbar } from "../components/Appbar";
import { Balance  } from "../components/Balance";
import { Users } from "../components/Users";
import { useSearchParams } from "react-router-dom";


export function Dashboard(){

    function showBalance(balance) {
        toast(`${balance}rs`);
    }

    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    return (
        <>
          <Toaster />
          <div className="dashboard">
            <Appbar user={name} />
            <Balance className="px-2" showBalance={showBalance} />
            <Users />
          </div>
        </>
      );
}