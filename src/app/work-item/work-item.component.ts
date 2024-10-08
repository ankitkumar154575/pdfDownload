import { Component, OnInit } from '@angular/core';
import { WorkItemService } from '../work-item.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css'],
})
export class WorkItemComponent implements OnInit {
  itemId: string = ''; // ItemId entered by user
  selectedWorkItem: any = null; // To store the selected work item
  workItems: any[] = []; // Array to hold all work items fetched from JSON
  showModal: boolean = false; // Flag to control modal display

  // Checkbox values
  workItemDetailsSelected: boolean = true;
  workItemNotesSelected: boolean = true;
  workItemAttachmentsSelected: boolean = true;
  workItemAuditHistorySelected: boolean = true;

  constructor(private workItemService: WorkItemService) {}

  ngOnInit() {
    // Fetch all work items when the component initializes
    this.workItemService.getAllWorkItems().subscribe((data) => {
      this.workItems = data; // Store the fetched work items
    });
  }

  // Preview work item details based on entered ItemId
  preview() {
    // Get the work item by ItemId
    this.selectedWorkItem = this.workItemService.getDetailsByItemId(this.itemId, this.workItems);

    if (this.selectedWorkItem) {
      this.showModal = true; // Open the modal if work item found
    } else {
      alert('ItemId not found!'); // Handle case if ItemId is not found
    }
  }

  // Close the modal
  closeModal() {
    this.showModal = false;
  }

  // Download the selected data as PDF using jsPDF
  downloadPDF() {
    const doc = new jsPDF();
  let yOffset = 10; // Starting Y position for text in PDF

  // Function to add a section title and some space after it
  const addSectionTitle = (title: string) => {
    doc.setFontSize(14);
    doc.text(title, 10, yOffset);
    yOffset += 10; // Add some space after title
  };

  // Function to add key-value pairs in a formatted way
  const addKeyValue = (key: string, value: any) => {
    doc.setFontSize(12);
    doc.text(`${key}: ${value}`, 10, yOffset);
    yOffset += 5; // Add space after each key-value pair
  };

  // Add Work Item Details to the PDF
  if (this.workItemDetailsSelected && this.selectedWorkItem?.CosmicWorkItem) {
    addSectionTitle('Work Item Details:');

    const workItem = this.selectedWorkItem.CosmicWorkItem;
    Object.entries(workItem).forEach(([key, value]) => {
      addKeyValue(key, value);
    });

    yOffset += 10; // Add some extra space after this section
  }

  // Add Work Item Notes to the PDF
  if (this.workItemNotesSelected && this.selectedWorkItem?.WorkItemNotes) {
    const notes = this.selectedWorkItem.WorkItemNotes;
    if (notes.length > 0) {
      addSectionTitle('Work Item Notes:');

      notes.forEach((note: any) => {
        addKeyValue('Note Date', note.NoteDate);
        addKeyValue('Entered By', note.EnteredBy);
        addKeyValue('Related Action', note.RelatedAction);
        yOffset += 5; // Add extra space after each note
      });

      yOffset += 10; // Add some extra space after this section
    }
  }

  // Add Work Item Attachments to the PDF
  if (this.workItemAttachmentsSelected && this.selectedWorkItem?.WorkItemAttachments) {
    const attachments = this.selectedWorkItem.WorkItemAttachments;
    if (attachments.length > 0) {
      addSectionTitle('Work Item Attachments:');

      attachments.forEach((attachment: any) => {
        addKeyValue('File Name', attachment.FileName);
        addKeyValue('Attach Date', attachment.AttachDate);
        addKeyValue('Size (KB)', attachment.SizeKB);
        yOffset += 5; // Add extra space after each attachment
      });

      yOffset += 10; // Add some extra space after this section
    }
  }

  // Add Work Item Audit History to the PDF
  if (this.workItemAuditHistorySelected && this.selectedWorkItem?.WorkItemAuditHistory) {
    const auditHistory = this.selectedWorkItem.WorkItemAuditHistory;
    if (auditHistory.length > 0) {
      addSectionTitle('Work Item Audit History:');

      auditHistory.forEach((audit: any) => {
        addKeyValue('Date', audit.Date);
        addKeyValue('Action', audit.Action);
        addKeyValue('Performed By', audit.PerformedBy);
        yOffset += 5; // Add extra space after each audit
      });
    }
  }

  // Save the PDF with a filename
  doc.save(`WorkItem_${this.itemId}.pdf`);
  }
}
