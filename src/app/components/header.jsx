import Image from "next/image";

const Header = () => {
    return <div
        style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            paddingTop: "20px",
        }}
    >
        <Image src="/logo.svg" alt="Logo" width={32} height={32} priority />
        <div
            style={{
                color: "#fff",
                marginLeft: "22px",
            }}
        >
            CRED-ASSESS
        </div>
    </div>

}

export default Header;