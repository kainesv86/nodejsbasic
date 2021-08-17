const Joi = require("joi");
const express = require("express");
const router = express.Router();

const courses = [
        { id: 1, name: "course1" },
        { id: 2, name: "course1" },
        { id: 3, name: "course1" },
];

// get (get all course)

router.get("/", (req, res) => {
        res.send(courses);
});

// get (get 1 course)

router.get("/:id", (req, res) => {
        const course = courses.find((c) => c.id === parseInt(req.params.id));
        if (!course) return res.status(404).send("Not found with the ID");
        res.send(course);
});

// Append (POST)

router.post("/", (req, res) => {
        const schema = Joi.object({
                name: Joi.string().min(3).required(),
        });

        const result = schema.validate(req.body);

        if (result.error) return res.status(400).send(result.error.details[0].message);

        const course = {
                id: courses.length + 1,
                name: req.body.name,
        };
        courses.push(course);
        res.send(course);
});

// Update (PUT)

router.put("/:id", (req, res) => {
        const course = courses.find((c) => c.id === parseInt(req.params.id));
        if (!course) return res.status(404).send("The course with the given ID was not found");

        const { error } = validateCourse(req.body);

        if (error) {
                res.status(400).send(error.details[0].message);
                return;
        }

        course.name = req.body.name;
        res.send(course);
});

// Delete

router.delete("/:id", (req, res) => {
        const course = courses.find((c) => c.id === parseInt(req.params.id));
        if (!course) return res.status(404).send("The course with the given ID was not found");

        const index = courses.indexOf(course);
        courses.splice(index, 1);

        res.send(course);
});

const validateCourse = (course) => {
        const schema = Joi.object({
                name: Joi.string().min(3).required(),
        });

        return schema.validate(course);
};

module.exports = router;
