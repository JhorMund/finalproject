import { Grid, Typography, Paper } from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout';

export default function about() {
  return (
   <Layout>
     <h1> About Us </h1>
     <div>
     <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
       <Grid container className="classes.main">
        <Typography>
          Toko Bunga Deisy Berlokasi di Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawei Utara.<br />
          Jam Operasional : Senin - Jumat 09:00 - 19:00.<br />
                            Sabtu 09:30 - 20:00<br />
                            Minggu (Tutup)
        </Typography>
       </Grid>
       </Paper>
     </div>
   </Layout>
  )
}
