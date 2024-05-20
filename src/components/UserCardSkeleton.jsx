import { Grid, Skeleton } from "@mui/material";

export const UserCardSkeleton = ({ repeatNumber = 1 }) => {
  const fill = Array.from({ length: repeatNumber });
  return (
    <>
      {fill.map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "100%", sm: "253px" },
              height: { xs: "96px", sm: "154px" },
              borderRadius: { xs: 0, sm: "12px" },
              marginTop: { xs: "4px", sm: 0 },
            }}
          />
        </Grid>
      ))}
    </>
  );
};
