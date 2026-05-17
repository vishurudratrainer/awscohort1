FROM python:3.11-slim

# Prevent Python from writing .pyc files and enable unbuffered logging
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Copy only requirements first to leverage Docker's cache layer
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Create a non-root user for security purposes
RUN useradd -u 8888 appuser && chown -R appuser /app
USER appuser

# Expose the port Flask is running on
EXPOSE 8000

# Command to run the application
CMD ["python", "main.py"]