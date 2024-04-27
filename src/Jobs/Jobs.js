import React, { useState } from 'react';
import { Container, Typography, Grid, Divider, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import JobListing from './JobListing'; // Assuming you have the JobListing component in a separate file
const JobsPage = () => {
  // Sample job listings data (replace with actual data from your backend)
  const jobListings = [
    { id: 1, title: 'Software Engineer', company: 'TechCo', location: 'San Francisco, CA', description: 'Join our team of innovative engineers!' },
    { id: 2, title: 'Product Manager', company: 'StartupX', location: 'New York, NY', description: 'Seeking a dynamic product manager to lead our team.' },
    { id: 3, title: 'Data Analyst', company: 'DataCorp', location: 'Seattle, WA', description: 'Analyzing data to drive business insights.' },
    // Add more job listings as needed
  ];
  // State for filters
  const [locationFilter, setLocationFilter] = useState('');
  const [keywordFilter, setKeywordFilter] = useState('');
  // Filter function
  const filterJobs = (job) => {
    // Apply filters here (you can add more complex logic as needed)
    if (locationFilter && job.location.toLowerCase() !== locationFilter.toLowerCase()) {
      return false;
    }
    if (keywordFilter && !job.title.toLowerCase().includes(keywordFilter.toLowerCase())) {
      return false;
    }
    return true;
  };
  return (
    <Container sx={{ px: { sx: 0, sm: 2, md: 3, lg: 30 }, bgcolor: "ligthq" }}>
      <Typography variant="h4" gutterBottom>
        Jobs
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* Filters */}
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          {/* Location filter */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="location-filter-label">Location</InputLabel>
            <Select
              labelId="location-filter-label"
              id="location-filter"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <MenuItem value="">All Locations</MenuItem>
              <MenuItem value="San Francisco, CA">San Francisco, CA</MenuItem>
              <MenuItem value="New York, NY">New York, NY</MenuItem>
              <MenuItem value="Seattle, WA">Seattle, WA</MenuItem>
            </Select>
          </FormControl>
          {/* Keyword filter */}
          <TextField
            fullWidth
            label="Keyword"
            value={keywordFilter}
            onChange={(e) => setKeywordFilter(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Job Listings */}
          {jobListings.filter(filterJobs).map(job => (
            <JobListing key={job.id} job={job} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default JobsPage;
