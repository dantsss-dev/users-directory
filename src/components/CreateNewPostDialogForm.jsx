import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { HasOnlyNumbers } from "../utils/ValidateInputs";
import { useDispatch } from "react-redux";
import { AddNewUserPost, fetchUserPosts } from "../features/posts/postsSlice";

export const CreateNewPostDialogForm = ({
  open,
  handleClose,
  fullScreen,
  userId,
}) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  const SendNewPost = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(
          AddNewUserPost({ user_id: userId, title, body }, userId)
        ).unwrap();
        setTitle("");
        setBody("");
      } catch (error) {
        console.error("Failed to save the post: ", error);
      } finally {
        setAddRequestStatus("idle");
        await dispatch(fetchUserPosts(userId)).unwrap();
        handleClose();
      }
    }
  };

  const canSave = !titleError && !bodyError && addRequestStatus === "idle";

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    if (!e.target.validity.valid) {
      setBodyError("Body is Required");
    } else if (e.target.value.length > 200) {
      setBodyError(`${body.length}/200`);
    } else {
      setBodyError(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!e.target.validity.valid) {
      setTitleError("Title is Required");
    } else if (HasOnlyNumbers(e.target.value)) {
      setTitleError("Title can't be only numbers");
    } else if (e.target.value.length > 40) {
      setTitleError(`${title.length}/40`);
    } else {
      setTitleError(false);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        sx: { width: { sm: "618px" }, borderRadius: { sm: "12px" } },
      }}
    >
      <DialogTitle id="responsive-dialog-title" textAlign={"center"}>
        <Stack sx={{ mt: 2 }}>
          <Typography variant="h4">New Post</Typography>
          <Fab
            variant="extended"
            color="error"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 24,
            }}
          >
            <CloseIcon />
          </Fab>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Typography
            variant="subtitle1"
            fontWeight={"Bold"}
            fontSize={20}
            lineHeight={2}
            letterSpacing={"0.5px"}
          >
            Title
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            id="txtTitle"
            value={title}
            onChange={handleTitleChange}
            error={!!titleError}
            helperText={titleError ? titleError : `${title.length}/40`}
          />
        </Stack>
        <Stack>
          <Typography
            variant="subtitle1"
            fontWeight={"Bold"}
            fontSize={20}
            lineHeight={2}
            letterSpacing={"0.5px"}
          >
            Body
          </Typography>
          <TextField
            id="txtBody"
            required
            hiddenLabel
            multiline
            rows={4}
            value={body}
            onChange={handleBodyChange}
            error={!!bodyError}
            helperText={bodyError ? bodyError : `${body.length}/200`}
          />
        </Stack>
        <Stack justifyContent={"center"} alignItems={"end"}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "20px", width: "140px", fontSize: "14px" }}
            onClick={SendNewPost}
          >
            Create Post
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
