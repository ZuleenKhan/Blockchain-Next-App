import React, { useState } from 'react';
import css from "../src/app/global.css"
import FileUpload from './FileUpload';
const TermsAndConditions = () => {
    
    return (
        <div style={{ margin: '20px' }}>
            <h1>Terms and Conditions</h1>
            <div style={{ height: '400px', overflow: 'auto', border:
'2px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <ol >
                <li>Reliability: The vendor agrees to be reliable in all interactions and transactions conducted on the platform.</li>
                <li>Responsibility for Wrongful Transfers: The vendor acknowledges that any wrongful transfers made by them are their sole responsibility, and the platform holds no liability for such actions.</li>
                <li>Certification Requirement: The vendor understands that their association with the platform is contingent upon the submission of a valid certificate providing proof of their reliability.</li>
                <li>Accuracy of Information: The vendor agrees to provide accurate and up-to-date information during registration and throughout their engagement with the platform.</li>
                <li>Compliance with Laws: The vendor commits to complying with all applicable laws and regulations governing their business activities.</li>
                <li>Intellectual Property Rights: The vendor warrants that they have the necessary rights or permissions to use any intellectual property (including trademarks, logos, etc.) displayed on their profile or in their products/services.</li>
                <li>Quality Standards: The vendor undertakes to maintain high-quality standards for their products/services offered on the platform.</li>
                <li>Timely Delivery: The vendor agrees to deliver products/services within the specified timelines as communicated to the backers.</li>
                <li>Communication: The vendor pledges to maintain clear and transparent communication with backers regarding the status of their projects, including any delays or changes.</li>
                <li>Conflict Resolution: In the event of any disputes or conflicts with backers, the vendor agrees to engage in good faith efforts to resolve them in an amicable manner.</li>
                <li>Indemnification: The vendor indemnifies the platform and its affiliates against any claims, damages, or losses arising from their breach of these terms and conditions or any misconduct.</li>
                <li>Confidentiality: The vendor agrees to keep all confidential information shared by the platform or other users confidential and not disclose it to third parties without prior consent.</li>
                <li>No Guarantee of Success: The vendor acknowledges that the platform does not guarantee the success of their project or campaign and that outcomes may vary.</li>
                <li>Termination of Agreement: The platform reserves the right to terminate the vendor's agreement or suspend their account at any time for violation of these terms or any other reason deemed appropriate by the platform.</li>
                <li>Updates to Terms: The platform reserves the right to update or modify these terms and conditions at any time, and the vendor agrees to abide by the updated terms upon notification.</li>
            </ol>
            </div>
            
            {/* <div>
                <button disabled={!isChecked} style={{ marginTop: '10px' }}>
                    Continue
                </button>
            </div> */}
            <FileUpload/>
        </div>
    );
};

export default TermsAndConditions;