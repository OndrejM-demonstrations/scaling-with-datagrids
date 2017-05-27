/*
 * Copyright 2016 Microprofile.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.microprofile.showcase.schedule.resources;

import io.microprofile.showcase.schedule.model.Schedule;
import io.microprofile.showcase.schedule.persistence.ScheduleDAO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/")
@Produces("application/json")
public class ScheduleResource {

    private final ScheduleDAO scheduleDAO = ScheduleDAO.INSTANCE;

    @GET
    @Path("/all")
    public Response allSchedules() {
        final List<Schedule> allSchedules = scheduleDAO.getAllSchedules();
        final GenericEntity<List<Schedule>> entity = buildEntity(allSchedules);
        return Response.ok(entity).build();
    }

    private GenericEntity<List<Schedule>> buildEntity(final List<Schedule> scheduleList) {
        return new GenericEntity<List<Schedule>>(scheduleList) {
        };
    }

}