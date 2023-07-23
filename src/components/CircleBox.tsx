import { Box } from "@mui/material";

type Props = {
  onClick?: ()=>void,
  selected: boolean,
}

const CircleBox:React.FC<Props> = ({ onClick, selected }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '2px solid gray',
        backgroundColor: selected ? 'lightgray' : 'transparent',
        cursor:"pointer"
      }}
    />
  );
}

export default CircleBox;
