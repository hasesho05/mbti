import { Box } from "@mui/material";
import Image from "next/image";

const Header = () => {
  return (
    <Box
        component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        width: '100vw',
        padding: '0 24px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
      }}
    >
      <Image src="/next.svg" alt="header" width={120} height={120}/>
    </Box>

  );
}

export default Header;