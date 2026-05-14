const {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} = require("@mui/material");

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// custom card
export const CustomCard = (props) => (
  <Card
    sx={{
      borderRadius: "24px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <CardMedia
      component="img"
      alt="green iguana"
      height="350"
      image={props.image}
    />
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        {props.name}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {props.description}
      </Typography>
    </CardContent>
    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button size="small">Learn More</Button>
      <Stack direction="row" spacing="0.5">
        <IconButton size="small" color="primary" onClick={props.onEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={props.onDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </CardActions>
  </Card>
);

// custom dialog
export const CustomDialog = ({ open, title, children, actions, maxWidth }) => (
  <Dialog open={open} maxWidth={maxWidth}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
);
