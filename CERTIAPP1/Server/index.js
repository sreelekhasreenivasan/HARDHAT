import express,{json} from 'express';

import { certRoute } from './Routes/CertRoute.js';

import{router} from './Routes/Event.js';

const app = express();

app.use(json());
app.use("/",certRoute);
app.use("/events",router);

const port=8000;

app.listen(port,function()
{console.log(`Serverlistening to port ${port}`)
})