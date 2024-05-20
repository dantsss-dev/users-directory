import { Grid, Skeleton } from "@mui/material";

export const PostCardSkeleton = () => {
  return (
    <Grid
      container
      item
      justifyContent="center"
      alignItems="center"
      xs={12}
      sm={10}
      md={12}
      lg={12}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: { xs: "100%", sm: "398px", md: "532px" },
          height: { xs: "96px", sm: "334px", md: "286px" },
          borderRadius: { xs: 0, sm: "12px" },
          marginTop: { xs: "4px", sm: 0 },
        }}
      />
    </Grid>
  );
};
