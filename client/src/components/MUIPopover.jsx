import * as React from "react";
import Popover from "@mui/material/Popover";

export default function MUIPopover({ content, triggerButton, _id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover${_id}` : undefined;

  return (
    <div>
      <div aria-describedby={id} variant="contained" onClick={handleClick}>
        {triggerButton}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{}}
      >
        {content}
      </Popover>
    </div>
  );
}
