import React, { Component } from 'react';

class Course extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    render () {

        let course_id=this.props.match.params.id;

        return (
            <div>
                <h1>{this.state.courses[course_id-1].title}</h1>
                <p>You selected the Course with ID: {course_id}</p>
            </div>
        );
    }
}

export default Course;