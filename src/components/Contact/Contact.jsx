import { useDispatch } from "react-redux";
import { setContactForEdit } from "../../redux/contacts/slice";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Checkbox,
  IconButton,
  ListItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { editContact } from "../../redux/contacts/operations";

const Contact = ({ contact, openModal }) => {
  const { _id, name, phoneNumber, isFavourite } = contact;
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setContactForEdit({ _id, name, phoneNumber }));
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children:
        name.split(" ").length === 1
          ? name[0]
          : `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <ListItem
      sx={{
        justifyContent: "center",
        padding: 0,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Card sx={{ width: { xs: 288, sm: 343, md: 514 } }}>
        <CardHeader
          avatar={
            <Avatar
              {...stringAvatar(name)}
              //! src={contact.avatar} //доробити бек, і доати до фронту
              alt={name}
              aria-label="contact-item"
            />
          }
          title={name}
          subheader={phoneNumber}
        />

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              checked={isFavourite ?? false}
              onChange={() => {
                dispatch(editContact({ _id: _id, isFavourite: !isFavourite }));
              }}
              inputProps={{ "aria-label": "controlled" }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={() => openModal(_id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </ListItem>
  );
};

export default Contact;
