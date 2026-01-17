const { Card, CardMedia, CardContent, Typography, CardActions, Button } = require("@mui/material");

export const CustomCard = (props) => (
  <Card>
    <CardMedia
      component="img"
      alt="green iguana"
      height="220"
      image={props.image}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.name}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {props.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);
