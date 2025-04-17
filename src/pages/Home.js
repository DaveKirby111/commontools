import React from "react";
import "../App.css";
import Layout from "../components/layout/Layout";
import tools from "../images/tools.jpg";

function Home() {
  return (
    <>
      <Layout page=" My Office Tools">
        <div className="flex flex-col md:flex-row p-4">
          <div className="home-container p-5">
            <img
              src={tools}
              className="tools"
              alt="tools"
              width={"auto"}
              height={"auto"}
            ></img>
          </div>
          <div className="home p-5">
            <h1>Welcome to My Office Tools</h1>
            <h2>To Do List</h2>
            <p>
              Your list itmes will be saved in the browser and can be deleted
              manually. It will only be saved in the browser that you had it
              opened in. Opening the site in a different browser from the one
              you created the list in will display the default list. In order to
              access the same list from any browser, on any device would require
              the use of a database which this site does not have access to.
            </p>
            <h2>Calendar</h2>
            <p>
              The calendar has a note section for any important reminders.
              Clicking on a day will allow you to create a note for that day and
              it will be saved in the browser. Like with the To Do List, it will
              only be saved in the browser that it was created. Opening the site
              in a different browser will display the default calendar with no
              notes. If you want to edit a note then all you have to do is click
              in the text box.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
