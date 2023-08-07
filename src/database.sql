
 CREATE TABLE Users
 (
     id       SERIAL PRIMARY KEY,
     role     VARCHAR(7) NOT NULL,
     username VARCHAR(30),
     CHECK( role IN ( 'Admin', 'Manager'))
 );

 CREATE TABLE Teachers
 (
     id         SERIAL PRIMARY KEY,
     first_name VARCHAR(30),
     last_name  VARCHAR(50),
     patronymic VARCHAR(30),
     phones     text[],
     emails     text[],
     status     VARCHAR(13),
     profile    VARCHAR(8),
     class      VARCHAR(15),
     user_id    INTEGER,
     FOREIGN KEY (user_id) REFERENCES Users (id),
     CHECK( status IN ( 'Working', 'Dismissed', 'On Vacation', 'On Maternity', 'On Sick Leave' )),
     CHECK( profile IN ('ZNO', 'DPA', 'School', 'In-depth') ),
     CHECK( class IN ( '1st grade', '2nd grade', '3rd grade', '4th grade', '5th grade', '6th grade', '7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade' ))
 );

 CREATE TABLE Schedule
 (
     id         SERIAL PRIMARY KEY,
     date       DATE,
     time_slots INT [],
     teacher_id INTEGER,
     FOREIGN KEY (teacher_id) REFERENCES Teachers (id)
 );


 CREATE TABLE Clients
 (
     ID         SERIAL PRIMARY KEY,
     NAME  VARCHAR(30),
     LAST_NAME  VARCHAR(30),
     SECOND_NAME VARCHAR(30),
     phones     text[],
     emails     text[],
     ROLE       VARCHAR(8),
     CHECK( role IN ( 'mother', 'father','guardian'))
 );


 



 
 
 
 
 CREATE TABLE Students
 (
     student_id  SERIAL PRIMARY KEY,
     UF_CRM_1628527876975  VARCHAR(30),
     last_name  VARCHAR(30),
     patronymic VARCHAR(30),
     UF_CRM_1628517957071     text[] NULL,
     emails     text[] NULL,
     UF_CRM_1628527920079   VARCHAR(256) NULL,
     UF_CRM_1628527903722   VARCHAR(10),
     UF_CRM_1629980767       VARCHAR(14),
     id         INTEGER,
     FOREIGN KEY (id) REFERENCES Clients (id),
     CHECK( UF_CRM_1628527903722 IN ( '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' )),
     CHECK( UF_CRM_1629980767  IN ( 'ЗНО ', 'ДПА', 'Шкільна програма 1-4 клас', 'Поглиблене навчання'))
);


 CREATE TABLE Lessons
 (
     id         SERIAL PRIMARY KEY,
     name       VARCHAR(50),
     zoom_link  VARCHAR(256),
     date       DATE,
     time_slot  INT [],
     teacher_id INTEGER,
     FOREIGN KEY (teacher_id) REFERENCES Teachers (id),
     student_id INTEGER,
     FOREIGN KEY (student_id) REFERENCES Students (id)
 );


 CREATE TABLE Reports
 (
     id         SERIAL PRIMARY KEY,
     duration   VARCHAR(50),
     emails     text[],
     start_time time,
     end_time   time,
     lesson_id  INTEGER,
     FOREIGN KEY (lesson_id) REFERENCES Lessons (id)
 );


 INSERT INTO Users (role, username) VALUES ('Admin', 'user1');

 INSERT INTO Users (role, username) VALUES ('Manager', 'user2');


 INSERT INTO Teachers (first_name, last_name, patronymic, phones, emails, status, profile, class, user_id)
 VALUES ('Ilon', 'Mask', 'Riv', '{"+380966666666", "+380999999999"}', '{"example@gmail.com"}', 'Working', 'ZNO', '1st grade', 2);

 INSERT INTO Teachers (first_name, last_name, patronymic, phones, emails, status, profile, class, user_id)
 VALUES ('Dasha', 'Dashuk', 'Dasheva', '{"+380955555555"}', '{}', 'On Vacation', 'DPA', '5th grade', 2);


 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-15', '{0,1,2,3,5,6,7,9,10,11,13,14,15,16,17,19,20,21,23,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,44,45,46,48,49,50,51,52,53,54,55,56,57,58,59,60,61,63,64,66,67,68,69,70,72,73,74,75,76,79,80,86,87,88,89,90,91,92,93,95,97,98,99,100,101,102,103,104,106,107,108,109,110,113,114,115,116,117,119,120,121,122,124,125,126,127,129,130,132,133,134,135,136,137,138,139,141,143,144,145,146,147,148,149,150,152,153,154,155,157,158,159,160,161,162,163,164,165,166,167,168,170,174,175,176,177,179,180,181,183,184,185,186,187,188,190,191,192,193,195,196,197,199,200,202,203,204,205,207,208,210,211,212,213,214,215,216,217,218,219,221,222,223,224,226,227,228,230,231,232,234,235,236,237,238,239,240,241,244,245,246,247,249,251,252,253,254,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,277,278,281,282,283,284,285,286,287}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-16', '{1,2,3,5,7,11,12,14,16,17,21,22,23,24,26,29,30,31,32,34,35,36,37,38,39,40,41,43,44,46,48,49,52,56,57,58,59,61,64,65,67,68,69,71,74,75,76,78,80,81,83,84,86,87,88,89,90,92,93,94,97,99,100,101,102,104,105,106,107,108,112,113,115,118,121,122,123,125,126,129,131,132,133,134,136,137,138,139,140,141,142,146,148,151,153,154,156,158,159,160,161,162,163,166,167,168,171,172,174,175,177,178,179,181,182,183,185,186,187,188,189,191,192,193,195,196,198,200,201,202,205,206,207,208,210,211,213,215,216,217,220,221,222,224,229,230,232,234,236,237,239,240,241,243,244,245,246,250,252,256,257,258,260,262,263,265,267,268,269,270,273,274,276,279,281,283,284,285,286}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-17', '{0,1,2,3,4,5,6,12,15,18,20,22,24,25,26,28,29,30,32,33,34,37,38,39,41,44,45,46,48,49,50,54,55,56,57,58,60,62,64,65,67,68,69,70,71,72,73,75,77,78,79,80,85,86,88,89,90,92,93,96,98,99,100,101,102,105,106,107,109,112,113,115,116,117,118,119,123,124,126,127,129,131,132,133,134,136,139,140,142,144,146,147,148,149,150,152,153,154,155,156,158,161,162,164,165,166,167,168,169,171,172,173,174,175,178,181,182,184,186,187,188,189,191,192,193,194,196,197,200,201,204,205,207,208,209,211,212,213,215,217,220,221,222,223,224,225,226,227,228,229,233,238,239,241,243,246,247,250,252,254,257,259,260,262,270,271,272,273,274,278,280,281,283,284,285,287}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-18', '{1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23,25,26,28,30,31,32,33,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,55,56,57,58,59,60,61,62,63,65,66,68,70,71,72,74,75,78,79,80,85,86,87,88,89,91,92,93,94,96,97,98,99,100,101,102,104,105,106,107,108,109,110,111,112,113,114,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,139,140,141,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,160,161,162,163,164,165,166,167,168,170,171,172,173,174,175,178,179,182,183,186,190,191,192,193,194,195,196,197,198,199,200,201,203,204,205,206,207,208,209,210,212,213,214,215,216,217,218,220,221,222,223,226,227,228,229,231,232,233,234,238,239,240,241,242,244,245,247,248,249,251,252,253,254,255,257,258,259,260,261,263,264,265,266,267,268,269,270,271,272,273,277,279,281,282,283,284,286,288}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-19', '{0,1,2,3,4,5,6,7,8,11,12,13,14,15,17,21,22,23,24,25,26,27,28,29,32,36,38,39,41,42,43,44,45,46,47,48,49,50,53,54,55,56,57,58,59,60,61,62,63,64,65,66,68,69,70,71,72,73,74,75,78,79,80,81,82,83,84,86,88,89,90,91,92,93,94,95,96,97,98,100,101,103,104,105,107,109,110,111,112,114,115,116,117,118,119,120,121,122,124,126,127,128,129,130,131,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,152,153,154,155,156,157,159,160,162,163,164,165,166,167,168,171,172,173,175,176,178,179,180,182,185,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,207,208,210,211,213,214,215,216,218,219,220,221,222,223,224,225,226,227,228,230,233,234,235,236,237,238,240,242,243,244,245,246,247,249,250,252,254,255,256,257,258,260,262,263,264,265,266,267,268,269,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-20', '{0,2,3,4,5,6,8,9,10,12,13,15,16,18,19,21,22,23,24,25,26,28,29,30,31,33,35,36,37,38,40,41,43,44,45,46,47,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,70,71,72,73,74,75,76,77,78,79,81,82,83,84,85,86,87,88,89,90,91,92,93,95,96,97,99,100,101,102,104,105,106,107,108,109,110,111,114,115,118,119,120,122,123,124,125,126,127,128,129,130,131,132,134,135,136,137,138,139,140,141,143,144,145,149,150,151,152,153,154,155,156,159,160,161,163,164,165,166,168,169,170,172,173,175,176,177,179,180,181,183,184,185,186,187,188,189,190,192,193,194,196,197,198,201,202,203,204,205,206,207,209,210,211,212,213,215,216,217,220,221,224,225,226,227,228,231,232,233,234,237,239,240,241,242,243,244,246,248,249,250,252,253,254,255,256,257,258,259,260,262,267,268,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-21', '{1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23,25,26,28,30,31,32,33,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,55,56,57,58,59,60,61,62,63,65,66,68,70,71,72,74,75,78,79,80,85,86,87,88,89,91,92,93,94,96,97,98,99,100,101,102,104,105,106,107,108,109,110,111,112,113,114,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,139,140,141,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,160,161,162,163,164,165,166,167,168,170,171,172,173,174,175,178,179,182,183,186,190,191,192,193,194,195,196,197,198,199,200,201,203,204,205,206,207,208,209,210,212,213,214,215,216,217,218,220,221,222,223,226,227,228,229,231,232,233,234,238,239,240,241,242,244,245,247,248,249,251,252,253,254,255,257,258,259,260,261,263,264,265,266,267,268,269,270,271,272,273,277,279,281,282,283,284,286,288}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-22', '{0,1,2,3,4,5,6,7,8,11,12,13,14,15,17,21,22,23,24,25,26,27,28,29,32,36,38,39,41,42,43,44,45,46,47,48,49,50,53,54,55,56,57,58,59,60,61,62,63,64,65,66,68,69,70,71,72,73,74,75,78,79,80,81,82,83,84,86,88,89,90,91,92,93,94,95,96,97,98,100,101,103,104,105,107,109,110,111,112,114,115,116,117,118,119,120,121,122,124,126,127,128,129,130,131,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,152,153,154,155,156,157,159,160,162,163,164,165,166,167,168,171,172,173,175,176,178,179,180,182,185,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,207,208,210,211,213,214,215,216,218,219,220,221,222,223,224,225,226,227,228,230,233,234,235,236,237,238,240,242,243,244,245,246,247,249,250,252,254,255,256,257,258,260,262,263,264,265,266,267,268,269,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-23', '{0,2,3,4,5,6,8,9,10,12,13,15,16,18,19,21,22,23,24,25,26,28,29,30,31,33,35,36,37,38,40,41,43,44,45,46,47,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,70,71,72,73,74,75,76,77,78,79,81,82,83,84,85,86,87,88,89,90,91,92,93,95,96,97,99,100,101,102,104,105,106,107,108,109,110,111,114,115,118,119,120,122,123,124,125,126,127,128,129,130,131,132,134,135,136,137,138,139,140,141,143,144,145,149,150,151,152,153,154,155,156,159,160,161,163,164,165,166,168,169,170,172,173,175,176,177,179,180,181,183,184,185,186,187,188,189,190,192,193,194,196,197,198,201,202,203,204,205,206,207,209,210,211,212,213,215,216,217,220,221,224,225,226,227,228,231,232,233,234,237,239,240,241,242,243,244,246,248,249,250,252,253,254,255,256,257,258,259,260,262,267,268,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-24', '{0,1,2,3,5,6,8,9,11,12,13,14,15,16,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,44,45,46,48,49,50,51,52,54,55,56,57,58,60,61,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,85,86,87,88,89,90,91,92,93,94,96,97,98,101,102,103,104,106,107,108,109,110,111,112,113,114,116,118,119,120,121,122,123,125,126,127,128,130,131,132,133,134,135,136,137,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,156,158,159,160,161,163,166,167,168,169,170,171,172,173,174,175,176,179,180,181,182,183,184,185,187,188,189,190,192,193,194,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,219,220,221,222,223,224,225,226,227,229,231,232,234,235,236,237,238,239,240,241,243,244,246,247,248,249,250,251,252,254,255,256,258,260,261,263,264,265,266,267,268,269,270,272,275,276,277,278,279,280,282,283,284,285,286,287,288}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-25', '{0,1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,55,56,57,59,60,61,62,64,65,66,68,69,70,71,72,73,74,75,76,77,78,80,82,83,84,85,87,88,89,90,91,92,93,96,99,100,102,103,104,105,107,109,111,112,114,115,117,119,120,121,122,124,125,127,128,129,131,132,133,134,135,138,140,141,142,143,144,145,146,148,150,151,152,153,154,155,156,158,160,161,163,166,167,168,169,170,171,172,173,174,177,178,179,181,182,183,184,186,187,188,189,190,191,192,193,194,195,196,198,199,200,202,203,204,205,206,207,208,209,211,213,216,217,218,219,220,221,223,224,228,229,230,231,232,233,234,235,236,237,238,240,242,243,244,245,246,249,250,251,252,253,254,255,256,257,258,259,260,261,262,264,265,267,268,269,271,272,274,275,276,277,279,281,282,283,284,285,286,288}', 1);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-26', '{0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288}', 1);


 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-15', '{0,1,2,3,4,6,11,12,13,18,19,21,22,24,29,32,36,39,40,41,44,45,47,51,54,55,62,65,67,68,69,74,75,81,82,84,86,92,93,96,98,106,107,108,109,110,114,119,121,126,129,131,132,134,136,137,139,142,144,149,151,153,158,161,162,163,165,169,171,176,177,178,180,183,185,187,189,190,191,193,195,197,200,202,207,208,220,221,223,224,225,226,229,231,234,239,240,242,243,246,248,249,250,252,254,259,260,261,262,263,264,266,267,268,271,272,273,274,281,283,286,287,288}', 2);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-16', '{0,1,2,3,5,6,8,9,11,12,13,14,15,16,19,20,21,22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,44,45,46,48,49,50,51,52,54,55,56,57,58,60,61,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,85,86,87,88,89,90,91,92,93,94,96,97,98,101,102,103,104,106,107,108,109,110,111,112,113,114,116,118,119,120,121,122,123,125,126,127,128,130,131,132,133,134,135,136,137,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,156,158,159,160,161,163,166,167,168,169,170,171,172,173,174,175,176,179,180,181,182,183,184,185,187,188,189,190,192,193,194,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,219,220,221,222,223,224,225,226,227,229,231,232,234,235,236,237,238,239,240,241,243,244,246,247,248,249,250,251,252,254,255,256,258,260,261,263,264,265,266,267,268,269,270,272,275,276,277,278,279,280,282,283,284,285,286,287,288}', 2);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-17', '{0,1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,55,56,57,59,60,61,62,64,65,66,68,69,70,71,72,73,74,75,76,77,78,80,82,83,84,85,87,88,89,90,91,92,93,96,99,100,102,103,104,105,107,109,111,112,114,115,117,119,120,121,122,124,125,127,128,129,131,132,133,134,135,138,140,141,142,143,144,145,146,148,150,151,152,153,154,155,156,158,160,161,163,166,167,168,169,170,171,172,173,174,177,178,179,181,182,183,184,186,187,188,189,190,191,192,193,194,195,196,198,199,200,202,203,204,205,206,207,208,209,211,213,216,217,218,219,220,221,223,224,228,229,230,231,232,233,234,235,236,237,238,240,242,243,244,245,246,249,250,251,252,253,254,255,256,257,258,259,260,261,262,264,265,267,268,269,271,272,274,275,276,277,279,281,282,283,284,285,286,288}', 2);

 INSERT INTO Schedule (date, time_slots, teacher_id) VALUES ('2021-08-18', '{2,3,4,5,6,7,8,9,10,11,12,14,15,16,18,21,22,24,25,28,29,30,31,33,34,35,36,37,38,39,40,41,43,47,48,49,50,51,52,53,54,55,58,59,60,61,62,63,64,65,66,68,69,70,71,72,74,76,77,78,79,80,81,82,83,84,85,88,89,90,92,93,94,95,96,99,100,101,102,103,104,105,106,107,108,110,111,112,113,114,115,116,118,119,120,121,122,124,126,127,128,130,131,132,134,135,136,137,138,140,141,142,143,144,145,146,147,149,150,151,152,153,154,155,157,159,160,161,162,163,164,165,167,168,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,186,187,188,189,190,191,192,193,194,195,196,197,198,200,202,203,204,205,206,207,210,211,212,213,214,215,217,218,219,221,222,223,224,225,226,227,229,230,231,232,233,234,236,237,238,239,240,241,243,244,245,247,248,251,252,253,254,255,257,258,259,261,262,263,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288}', 2);


 INSERT INTO Clients (first_name, last_name, patronymic, phones, emails, role) VALUES ('Svetlana', 'Melnyk', 'Serhiivna', '{"+380966666666", "380999999999"}', '{"example@gmail.com"}', 'mother');


 INSERT INTO Students (first_name, last_name, patronymic, phones, emails, goal, class, task, client_id) VALUES ('Kostya', 'Melnyk', 'Volodymyrovich', '{}', '{"student1@gmail.com"}', '', '7th grade', 'DPA', 1);

 INSERT INTO Students (first_name, last_name, patronymic, phones, emails, goal, class, task, client_id) VALUES ('Ivanna', 'Melnyk', 'Volodymyrovna', '{}', '{"student2@gmail.com"}', '', '11th grade', 'ZNO', 1);
>>>>>>> 9f52f27cd9bbc6e9495fedff6628cc3fd60f2a7a