import Link from "next/link";

const Topbar = () => {
  return (
    <div className="bg-gray-100">
      <div className="container flex justify-between px-8 py-2.5 mx-auto text-xs max-w-7xl lg:px-8">
        <div className="flex lg:flex-1">
          Mobil uygulamayı&nbsp;<Link  href="#" className="font-bold underline">Hemen İndir</Link>
        </div>
        <div className="flex items-center justify-end flex-1 gap-x-6">
            <Link  href="#">Sipariş Takibi</Link>
            <Link  href="/yardim">Yardım</Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
