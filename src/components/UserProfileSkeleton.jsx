import { Grid, Skeleton } from "@mui/material";

export const UserProfileSkeleton = ({ repeatNumber = 1 }) => {
  const fill = Array.from({ length: repeatNumber });
  return (
    <>
      {fill.map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={12} lg={12}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "238x" },
              height: { xs: "204px" },
              borderRadius: "12px",
            }}
          />
        </Grid>
      ))}
    </>
  );
};
