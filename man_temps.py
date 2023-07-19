def new_page_temp(page_name):
    content = f"""import React from "react";
import {{ Container }} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const {page_name} = () => {{

    //meta title
    document.title="{page_name} page | Black Storm Admin Dashboard";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {{/* Render Breadcrumbs */}}
          <Breadcrumbs title="{page_name}" breadcrumbItem="{page_name} Page" />
        </Container>
      </div>
    </React.Fragment>
  )
}}

export default {page_name};
"""
    return content