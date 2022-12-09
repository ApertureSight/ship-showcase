import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import Typography from "@mui/material/Typography";

import "../styles.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//sets ship function
export default function Ships() {
  const [ships, setShips] = useState([]);

  //current expanded use state

  const [curExpanded, setCurExpanded] = useState(1);

  //expand card code

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //read JSON data
  useEffect(() => {
    fetch("../data/shipData.json")
      .then((res) => res.json())
      .then((ships) => {
        setShips(ships);
      });
  }, []);
  //set JSON data into the Card object

  const shipData = ships.map((ship, index) => (
    <Card
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      sx={{ maxWidth: 345 }}
      className="box"
    >
      <CardHeader title={ship.name} align="center" />
      <CardMedia
        component="img"
        height="194"
        image={ship.image}
        alt={ship.name}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          text-decoration-line="underlined"
        >
          {ship.shortdes}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={index === curExpanded}
          onClick={() => {
            if (index === curExpanded) {
              setCurExpanded(-1);
            } else {
              handleExpandClick();
              setCurExpanded(index);
            }
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        onClick={() => {
          handleExpandClick(-1);
          setCurExpanded(index - 1);
        }}
        in={index === curExpanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Typography paragraph fontWeight="bold">
            {ship.name}
          </Typography>
          <Typography paragraph fontStyle="italic">
            {ship.shortdes}
          </Typography>
          <Typography paragraph>{ship.description}</Typography>
          <Typography fontWeight="bold">
            Purchase Locations:
            <Typography>{ship.location}</Typography>
          </Typography>
          <Typography fontWeight="bold">
            In-Game Price:
            <Typography>{ship.purchase}</Typography>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  ));

  return <div className="grid">{shipData}</div>;

  // Card Name, insert ship name
}
