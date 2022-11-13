import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import docs from '../../../utilities/docs';

const router = Router();

const specs = swaggerJsdoc({
    swaggerDefinition: docs,
    apis: ['src/docs/*.yml'],
});

router.use('/docs', swaggerUi.serve);
router.get(
    '/docs',
    swaggerUi.setup(specs, {
        explorer: true,
    }),
);

export default router;
