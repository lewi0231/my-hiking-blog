const ContentActual = [
  {
    heading: "Introduction",
    content: [
      {
        subheading: "1.1 Purpose: ",
        text: `Welcome to Recursive Trails! Our mission
is [state mission]. Your use of our platform constitutes
acceptance of these terms.`,
      },
      {
        subheading: "1.2 Acceptance: ",
        text: `By using our services, you
acknowledge and agree to abide by the terms outlined herein.`,
      },
    ],
  },
  {
    heading: "User Rights and Responsibilities",
    content: [
      {
        subheading: "2.1 User Conduct: ",
        text: `Users must engage in respectful and lawful behavior on our platform. Any violation may result in consequences outlined in Section 7.`,
      },
      {
        subheading: "2.2 Account Responsibility: ",
        text: `Users are responsible for maintaining the security of their accounts and ensuring responsible use.`,
      },
    ],
  },
  {
    heading: "Service Description",
    content: [
      {
        subheading: "3.1 Overview: ",
        text: `At Recursive Trails, we provide [brief description of services].  Our commitment is to deliver [key benefits]`,
      },
      {
        subheading: "3.2 Modifications: ",
        text: ` We reserve the right to modify or discontinue services for enhancement and evolution.  Users will be fuly notified of significant changes.`,
      },
    ],
  },
];

const TermsOfService = () => {
  return (
    <section>
      <h2>Who we are</h2>
      <p>
        Recursive Trails is a hiking / travel blog with the web address:
        https://recursivetrails.com
      </p>
      <h2>Terms and conditions of service</h2>
      <p>
        All content provided on the Website is for informational purposes only.
        We make no representations as to the accuracy, completeness or
        availability of any information and are not liable for any errors or
        omissions. Nor are we liable for any losses, injuries, or damages from
        use of this information.
      </p>
      <p>
        The content of the Website (unless otherwise stated) is covered by
        copyright. If you would like to republish our articles or use our images
        please get in touch at recursivetrails@gmail.com.
      </p>
    </section>
  );
};

const ContentBlock = ({
  heading,
  content,
}: {
  heading: string;
  content: { subheading: string; text: string }[];
}) => {
  return (
    <li>
      <h3>{heading}</h3>
      <ul>
        {content.map((item, index) => {
          return (
            <li key={item.subheading + index}>
              <span>{item.subheading}</span> {item.text}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default TermsOfService;
