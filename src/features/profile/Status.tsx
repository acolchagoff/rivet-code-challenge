import { Box } from "@mui/material";
import { countProfiles } from "./profileSlice";
import { useSelector } from "react-redux";

const Status = () => {
  const count = useSelector(countProfiles)


  return (
    <Box sx={{fontSize: '12px', color: '#888', marginTop: '1em'}}>
      Listing { count } profile(s).
    </Box>
  )
}

export { Status }