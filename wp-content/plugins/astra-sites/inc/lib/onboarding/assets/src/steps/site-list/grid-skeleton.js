import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const GridSkeleton = () => {
	return (
		<div className="st-grid-skeleton">
			<Grid container>
				<Grid item xs={ 12 }>
					<Box
						p="0"
						display="grid"
						gridGap="40px"
						gridTemplateColumns="1fr 1fr 1fr 1fr"
					>
						<Skeleton
							variant="rect"
							height={ 380 }
							animation="wave"
						/>
						<Skeleton
							variant="rect"
							height={ 380 }
							animation="wave"
						/>
						<Skeleton
							variant="rect"
							height={ 380 }
							animation="wave"
						/>
						<Skeleton
							variant="rect"
							height={ 380 }
							animation="wave"
						/>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default GridSkeleton;
