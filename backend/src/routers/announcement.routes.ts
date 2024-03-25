import { Router } from 'express';
import announcementController from '../controller/announcement.controller';

const announcement = Router();

announcement.get('/', announcementController.getAnnouncementsWithCreator);
announcement.post('/setVisibility', announcementController.setVisibility);
announcement.post('/setContent', announcementController.setContent);
announcement.post('/create', announcementController.createAnnouncement);
announcement.post('/delete', announcementController.deleteAnnouncement);

export default announcement;
